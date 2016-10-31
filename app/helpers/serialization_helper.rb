# frozen_string_literal: true
module SerializationHelper
  def serialize(resource, options = {})
    ActiveModelSerializers::SerializableResource.new(resource, options).as_json
  end
end
