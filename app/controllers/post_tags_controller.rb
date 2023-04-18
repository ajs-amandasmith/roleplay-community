class PostTagsController < ApplicationController
  # skip_before_action :authorize

  def index
    render json: PostTag.all
  end

  def create
    postTag = PostTag.create!(post_tag_params)
    render json: postTag, status: :created
  end

  private

  def post_tag_params
    params.permit(:tag_id, :post_id)
  end

end