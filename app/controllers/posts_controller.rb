class PostsController < ApplicationController
  skip_before_action :authorize

  def index
    render json: Post.all, include: :tags
  end
end
