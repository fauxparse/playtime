# frozen_string_literal: true
class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :name, limit: 128, required: true
      t.string :slug, limit: 128, required: true
      t.belongs_to :team, foreign_key: { on_delete: :cascade }
      t.text :schedule_options

      t.timestamps

      t.index [:team_id, :slug], unique: true
    end
  end
end
