class CharactersController < ApplicationController
  # skip_before_action :authorize

  def index
    render json: Character.all
  end

  def create
    user = @current_user
    character = user.characters.create!(character_params)
    render json: character, status: :created
  end

  private

  def character_params
    params.permit(:name, :about, :avatar, :user_id)
  end

end
