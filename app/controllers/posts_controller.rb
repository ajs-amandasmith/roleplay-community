class PostsController < ApplicationController
  skip_before_action :authorize

  def index
    render json: Post.all.with_attached_image, include: [:tags, :comments]
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  private

  def post_params
    params.permit(:title, :post, :character, :user, :comments, :image)
  end

end
