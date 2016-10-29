# frozen_string_literal: true
class AddStateToInvitations < ActiveRecord::Migration[5.0]
  def change
    change_table :invitations do |t|
      t.string :state,
        limit: 32,
        required: true,
        default: 'pending',
        index: true
    end
  end
end
