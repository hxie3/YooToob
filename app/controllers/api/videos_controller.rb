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
        if(video_params[:views] != @video[:views])
            # video_params[:views] is based on the state, a diff user could have updated views so current views count is inaccurate
            # Test adding 1 to @video[:views] to make a more accurate view count rather than using state alone
            @video.update({views: video_params[:views]})
            render :update
        else
            if @video.update(video_params)
                render :update
            else
                render json: @video.errors.full_messages, status: 404
            end
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

    def search
        query = "%" + params[:query] + "%"
        @videos = Video.joins(:user).where("lower(username) LIKE ? OR lower(title) LIKE ?", query.downcase, query.downcase)
        render :search
    end

    private

    def video_params
        params.require(:video).permit(:title, :description, :id, :video, :views, :created_at, :user_id, :username, :profilePicture, :thumbnail)
    end
end
