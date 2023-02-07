class ChangeGroupsUsersToUserGroups < ActiveRecord::Migration[7.0]
  def change
    rename_table :groups_users, :user_groups
  end
end
