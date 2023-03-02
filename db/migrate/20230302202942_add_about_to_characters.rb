class AddAboutToCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :characters, :about, :text
  end
end
