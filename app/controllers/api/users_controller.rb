class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render json: @user
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    def index
        @user = params[:user].permit(:username).to_h
        user = User.find_by(username: @user[:username])
        if user
            render json: ["Username has already been taken"], status: 400
        else
            if @user[:username] == ''
                render json: ["Username can't be blank"], status: 400
            else
                render json: @user
            end
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
