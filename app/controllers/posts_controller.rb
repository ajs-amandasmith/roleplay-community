require 'debug'

class PostsController < ApplicationController
  # skip_before_action :authorize

  def index
    render json: Post.all.with_attached_image, include: [:tags, :comments]
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    user = @current_user
    post = user.posts.create!(post_params)
    render json: post, status: :created
  end

  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    render json: post, status: :created
  end

  private

  def post_params
    params.permit(:title, :post, :character, :user, :comments, :image, :character_id)
  end

end
