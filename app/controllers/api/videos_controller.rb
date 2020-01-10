class Api::VideosController < ApplicationController
    def index
        @videos = Video.all
        render :index
    end

    def create
        @video = Video.new(video_params)
        
        if @video.save
            render :create
        else
            render json: @video.errors.full_messages, status: 400
        end
    end

    def show
        @video = Video.find_by(id: params[:id])

        if @video
            render :show
        else
            render json: ["No video was found"], status: 404
        end
    end

    def update
        @video = Video.find_by(id: params[:id])
        if @video.update(video_params)
            render :update
        else
            render json: @video.errors.full_messages, status: 404
        end
    end

    def destroy
        @video = Video.find_by(id: params[:id])
        if @video
            render :destroy
            Video.delete(params[:id])
        else
            render json: ["No video was found"], status: 404
        end
    end

    private

    def video_params
        params.require(:video).permit(:title, :description, :user_id, :id)
    end
end
