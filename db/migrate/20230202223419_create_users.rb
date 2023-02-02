class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.text :about_me

      t.timestamps
    end
  end
end
