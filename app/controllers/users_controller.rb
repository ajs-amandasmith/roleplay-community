class UsersController < ApplicationController
  skip_before_action :authorize
  
  def index
    render json: User.all
  end
end
