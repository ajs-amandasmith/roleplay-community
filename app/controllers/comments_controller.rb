class CommentsController < ApplicationController
  skip_before_action :authorize

  def index
    render json: Comment.all
  end
end
