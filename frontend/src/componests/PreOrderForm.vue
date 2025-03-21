<template>
    <div class="row g-5">
      <div class="col-md-8 offset-md-2">
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="lastName" class="form-label">Product <Required /></label>
                <b-form-select
                  v-model="formData.product_id"
                  :options="productList"
                  ></b-form-select>
                
                <div class="text-danger">
                  <Error :errors="errors" name="product_id" />
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label for="lastName" class="form-label">Full name <Required /></label>
                <input type="text" v-model="formData.name" class="form-control" placeholder="Enter full name" value="">
                <div class="text-danger">
                  <Error :errors="errors" name="name" />
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label for="email" class="form-label">Email <Required /></label>
                <input type="email" v-model="formData.email" class="form-control" placeholder="you@example.com">
                <div class="text-danger">
                  <Error :errors="errors" name="email" />
                </div>
              </div>
            </div>
            <div class="col-12" v-if="checkEmail()">
              <div class="form-group">
                <label for="phone" class="form-label">Phone No <Required /></label>
                <input type="phone" v-model="formData.phone" class="form-control" placeholder="+8801730-233032">
                <div class="text-danger">
                  <Error :errors="errors" name="phone" />
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label for="address2" class="form-label">Descripton<Required /></label>
                <textarea type="text" rows="4" v-model="formData.description" class="form-control" placeholder="Enter description"> </textarea>
                <div class="text-danger">
                  <Error :errors="errors" name="description" />
                </div>
              </div>
            </div>
            <div class="col-12">
              <vue-friendly-captcha 
              sitekey="FCMVEAIFO40CPRD6" 
              ref="captcha"
              @done="onCaptchaSolved"
              />
              <div class="text-danger">
                <Error :errors="errors" name="recaptcha" />
              </div>
            </div>
            
          </div>
          <hr class="my-2">
          <button class="w-100 btn btn-primary" :disabled="!formData.recaptcha" type="submit"><i class="fa fa-save"></i> Submit Now</button>
        </form>
      </div>
    </div>
</template>
<script>
import  RestApi, { baseUrl } from '../config/api_config';
import Required from './Required';
import Error from './Error';
import VueFriendlyCaptcha from '@somushq/vue-friendly-captcha';
import iziToast from 'izitoast';
import { productList } from '../Utils/constants';
const formData  = {
              unique_id: null,
              product_id: null,
              name: null,
              email: null,
              phone: null,
              description: null,
              recaptcha: null,
            }
export default {
    name: "PreOrderForm",
    components: {
      Required,
      Error,
      VueFriendlyCaptcha
    },
    data() {
      return {
        formData: {...formData},
        captchaToken: '',
        errors: {},
      }
    },
    computed: {
      productList () {
        return productList
      }
    },
    methods: {
      checkEmail() {
        return  this.formData.email ? !this.formData.email.endsWith('@gmail.com') : false;
      },
      onCaptchaSolved(token) {
        this.formData.recaptcha = true;
        this.captchaToken = token;
      },
      async submitForm () {
          if (!this.formData.recaptcha) {
            this.errors['recaptcha'] = ['Please solve captcha']
            return;
          }
          try {
            const result = await RestApi.postData(baseUrl, 'pre-orders/store', this.formData)
            iziToast.success({
                title: 'Success',
                message: result.message
            })
            this.formData = {...formData}
          } catch (e) {
            if(e.status == 422) {
              this.errors = e.errors
            }
            iziToast.error({
                title: 'Success',
                message: 'Something went wrong'
            })
          }
      }
    }
  }
</script>