class CharactersController < ApplicationController
  skip_before_action :authorize, only: :index

  def index
    render json: Character.all
  end

  def show
    character = Character.find(params[:id])
    render json: character
  end

  def create
    user = @current_user
    character = user.characters.create!(character_params)
    render json: character, status: :created
  end

  def update
    character = Character.find(params[:id])
    character.update!(character_params)
    render json: character, status: :created
  end

  def destroy
    character = Character.find(params[:id])
    character.destroy
    head :no_content
  end

  private

  def character_params
    params.permit(:name, :about, :avatar, :user_id)
  end

end
