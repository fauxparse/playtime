# frozen_string_literal: true
class AddStartsAtToEvents < ActiveRecord::Migration[5.0]
  def change
    change_table :events do |t|
      t.datetime :starts_at, required: true
      t.datetime :stops_repeating_at, required: false
      t.index [:starts_at, :team_id, :stops_repeating_at]
    end
  end
end
