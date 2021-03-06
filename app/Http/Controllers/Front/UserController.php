<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\BLL\Front\UserBLL;
use App\BLL\Front\ProductLikerBLL;
use App\BLL\Front\ProductBLL;
use App\BLL\Front\UserAvatarBLL;
use Socialite;

class UserController extends Controller
{
    //
    public function RedirectToProvider()
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function HandleProviderCallback()
    {
        $user = Socialite::driver('facebook')->user();
        UserBLL::AddUserByFacebook($user);
        return back();
        // $user->token;
    }

    public static function CheckExistUserPhoneNumber(Request $request)
    {   
        $phone_number = $request['phonenumber_register'];
        if(UserBLL::CheckExistUserPhoneNumber($phone_number))
            return 'false';
        return 'true';
    }

    public static function AddUserByPhoneNumber(Request $request)
    {   
        $phone_number = $request['phonenumber_register'];
        $password = $request['password_register'];
        if($phone_number == NULL || $password == NULL)
            return 0;
        if(UserBLL::AddUserByPhoneNumber($phone_number, $password))
        {
            Auth::attempt(['phone_number' => $phone_number, 'password' => $password]);
            return back()->with('register_status', 1)->withInput();
        }
    }

    public static function LogOutUser()
    {
        if(Auth::check())
        {
            Auth::logout();
            return back();
        }
    }

    public static function LoginUser(LoginUserRequest $request)
    {
        $phone_number = $request['phonenumber_login'];
        $password = $request['password_login'];
        if(Auth::attempt(['phone_number' => $phone_number, 'password' => $password]))
        {
            return back()->withInput()->with('login-status', 'true');
        }
        return back()->withInput()->with('login-status', 'false');
    }

    public static function CheckLogin()
    {
        if(Auth::check())
        {
            return 1;
        }
        return 0;
    }

    public static function LikeProduct()
    {
        if(UserController::CheckLogin())
        {
            $product_id = $_GET['product_id'] ?? NULL;
            $user_id = Auth::id();
            if($product_id === NULL || $user_id === NULL)
            {
               return;
            }
            if(ProductLikerBLL::LikeProduct($product_id, $user_id)) // Nếu like thành công thì thêm like
            {
                $action = 'add';
            }
            else
            {
                $action = 'remove';
            }
            return ProductBLL::UpdateLikeNumber($product_id, $action); 
        }
    }
}
