class PostsController < ApplicationController
  skip_before_action :authorize

  def index
    render json: Post.all, include: [:tags, :comments]
  end
end
