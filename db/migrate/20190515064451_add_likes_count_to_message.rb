class AddLikesCountToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :likes_count, :integer
  end
end
