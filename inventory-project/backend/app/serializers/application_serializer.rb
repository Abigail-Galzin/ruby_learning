class ApplicationSerializer
  def initialize(resource, **options)
    @resource = resource
    @options = options
  end

  def serializable_hash
    raise NotImplementedError, "#{self.class} must implement #serializable_hash"
  end

  private

  attr_reader :resource
  attr_reader :options
end
