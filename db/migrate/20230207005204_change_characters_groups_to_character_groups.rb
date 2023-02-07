class ChangeCharactersGroupsToCharacterGroups < ActiveRecord::Migration[7.0]
  def change
    rename_table :characters_groups, :character_groups
  end
end
