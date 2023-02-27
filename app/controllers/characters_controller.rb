class CharactersController < ApplicationController
  skip_before_action :authorize

  def index
    render json: Character.all
  end
end
