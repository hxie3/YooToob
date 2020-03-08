class Api::LikesController < ApplicationController
    def create
        @like = Like.new(like_params)
        if @like.save
            render :create
        else
            render json: @like.errors.full_messages, status: 400
        end
    end

    def update
        @like = Like.find_by(id: params[:id])
        if @like.update(like_params)
            render :update
        else
            render json: @like.errors.full_messages, status: 404
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        if @like
            render :destroy
            Like.delete(params[:id])
        else
            render json: ["No like was found"], status: 404
        end
    end

    private

    def like_params
        params.require(:like).permit(:liked, :user_id, :likeable_id, :likeable_type)
    end
end
