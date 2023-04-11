require 'debug'

class CommentsController < ApplicationController
  # skip_before_action :authorize

  def index
    render json: Comment.all
  end

  def create
    user = @current_user
    comment = user.comments.create!(comment_params)
    render json: comment, status: :created
  end

  private

  def comment_params
    params.permit(:comment, :post_id, :character, :user, :comments, :image, :character_id)
  end

end
