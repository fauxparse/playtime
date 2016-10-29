# frozen_string_literal: true
class AddNameToMembers < ActiveRecord::Migration[5.0]
  def change
    add_column :members, :name, :string, limit: 128
  end
end
