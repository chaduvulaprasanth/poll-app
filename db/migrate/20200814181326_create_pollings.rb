class CreatePollings < ActiveRecord::Migration[6.0]
  def change
    create_table :pollings do |t|
      t.string :question
      t.timestamps
    end
  end
end
