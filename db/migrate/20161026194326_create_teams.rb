class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :name, limit: 128, required: true
      t.string :slug, limit: 128, required: true
      t.timestamps

      t.index :slug, unique: true
    end
  end
end
