class DropCharacterGroups < ActiveRecord::Migration[7.0]
  def change
    drop_table :character_groups
  end
end
