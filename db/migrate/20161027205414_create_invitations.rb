# frozen_string_literal: true
class CreateInvitations < ActiveRecord::Migration[5.0]
  def change
    create_table :invitations do |t|
      t.belongs_to :sponsor,
        foreign_key: { on_delete: :cascade, to_table: :members }
      t.belongs_to :member, foreign_key: { on_delete: :cascade }
      t.string :email, null: false

      t.timestamps
    end
  end
end
