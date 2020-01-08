class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )
        

        if @user
            login(@user)
            render json: @user
        else
            render json: ["Wrong password. Try again."], status: 401
        end
    end

    def update
        @user = User.find_by(username: params[:user][:username])
        if @user
            user = params[:user].permit(:username, :password).to_h
            user.merge!(id: @user[:id])
            render json: user
        else
            render json: ["Couldn't find your YooToob account"], status: 404
        end
    end

    def destroy
        @user = current_user
        if @user
            logout
            render json: {}
        else
            render json: ['No user logged in'], status: 404
        end
    end
end
