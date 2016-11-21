# frozen_string_literal: true
class CreateOccurrences < ActiveRecord::Migration[5.0]
  def change
    create_table :occurrences do |t|
      t.belongs_to :event, required: true, foreign_key: { on_delete: :cascade }
      t.datetime :starts_at, required: true
      t.index [:event_id, :starts_at], unique: true
    end
  end
end
