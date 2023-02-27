class RemoveGroupIdFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :group_id
  end
end
