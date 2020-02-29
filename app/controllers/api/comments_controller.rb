class Api::CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :create
        else
            render json: @comment.errors.full_messages, status: 400
        end
    end

    def show
        @comment = Comment.find_by(id: params[:id])

        if @comment
            render :show
        else
            render json: ["No comment was found"], status: 404
        end
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment.update(comment_params)
            render :update
        else
            render json: @comment.errors.full_messages, status: 404
        end
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment
            render :destroy
            Comment.delete(params[:id])
        else
            render json: ["No comment was found"], status: 404
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :video_id, :user_id, :id, :profilePicture, :username)
    end
end
