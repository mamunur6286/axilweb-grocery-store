<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Summary of login
     * @param \App\Http\Requests\LoginRequest $request
     * @return JsonResponse|mixed
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {

            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $token = $user->createToken('AuthToken')->accessToken;

                $data = [
                        'token' => $token,
                        'user' => $user
                ];

                return response()->json([
                    'success' => true,
                    'message' => 'Login Successfully.',
                    'data' => $data
                ], Response::HTTP_OK);

            }

            return response()->json([
                'success' => true,
                'message' => 'User and password not match.',
                'data' => []
            ], Response::HTTP_UNAUTHORIZED);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => app()->isProduction() ? 'Internal Server Error' : $e->getMessage(),
                'data' => []
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
