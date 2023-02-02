class CreateJoinTableCharacterGroup < ActiveRecord::Migration[7.0]
  def change
    create_join_table :characters, :groups do |t|
      # t.index [:character_id, :group_id]
      # t.index [:group_id, :character_id]
    end
  end
end
