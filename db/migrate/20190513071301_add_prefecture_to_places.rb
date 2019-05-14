class AddPrefectureToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :prefecture, :integer, default: 0
  end
end
