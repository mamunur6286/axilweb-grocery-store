<?php


/**
 * Define system constants
*/
const S_DELETE_MSG = 'Successfully deleted';
const E_DELETE_MSG = 'Not successfully updated';
const S_UPDATE_MSG = 'Successfully updated';
const E_UPDATE_MSG = 'Not successfully updated';
const S_SAVE_MSG = 'Successfully created';
const E_SAVE_MSG = 'Not successfully created';
const S_DEL_MSG = 'Successfully deleted';
const E_DEL_MSG = 'Not successfully deleted';



if (!function_exists('generateUniqueID'))
{
    /**
     * Summary of generateUniqueID
     * @param mixed $prefix
     * @param mixed $id
     * @param mixed $length
     * @return string
     */
    function generateUniqueID($prefix, $id, $length = 6): string
    {
        return $prefix . '-' . date('y') . '-' . str_pad($id, $length, '0', STR_PAD_LEFT);
    }
}