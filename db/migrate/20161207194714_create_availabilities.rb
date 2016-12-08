# frozen_string_literal: true
class CreateAvailabilities < ActiveRecord::Migration[5.0]
  def change
    create_table :availabilities do |t|
      t.belongs_to :member, required: true,
                            foreign_key: { on_delete: :cascade }
      t.belongs_to :occurrence, required: true,
                                foreign_key: { on_delete: :cascade }
      t.boolean :available, required: true, default: true
      t.index [:member_id, :occurrence_id], unique: true
      t.timestamps
    end
  end
end
