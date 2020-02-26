class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            @user.profile_picture.attach(io: File.open(File.join(Rails.root, "app/assets/images/signin.jpeg")), filename: "default_profile_pic.jpeg")
            login(@user)
            render :create
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    def update
        @user = User.find_by(username: user_params[:username])
        if @user.update(user_params)
            render :update
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
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
        params.require(:user).permit(:username, :password, :profile_picture)
    end
end
