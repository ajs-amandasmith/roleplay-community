class TagsController < ApplicationController
  skip_before_action :authorize

  def index
    render json: Tag.all, include: :posts
  end
end
