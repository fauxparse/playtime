# frozen_string_literal: true
class AddTokenToInvitations < ActiveRecord::Migration[5.0]
  def change
    change_table :invitations do |t|
      t.string :token, required: true, limit: 64
    end
  end
end
