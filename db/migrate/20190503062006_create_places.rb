class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.text :place_name
      t.text :address
      t.text :station

      t.timestamps
    end
  end
end
