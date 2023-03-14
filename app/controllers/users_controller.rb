class UsersController < ApplicationController
  skip_before_action :authorize, only: :create
  
  def index
    render json: User.all.with_attached_avatar
  end

  def show
    render json: @current_user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    @current_user.update!(user_params)
    render json: @current_user, status: :created
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :avatar)
  end
end
