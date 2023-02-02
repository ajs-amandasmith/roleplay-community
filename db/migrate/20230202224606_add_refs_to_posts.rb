class AddRefsToPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :character, null: false, foreign_key: true
    add_reference :posts, :group, null: false, foreign_key: true
  end
end
