package racing.odds.server.utilities;

import java.util.Map;
import java.util.Objects;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MapUtils {
  public static Map<String, Object> fromObjectWoNulls(Object object) {
    ObjectMapper mapper = new ObjectMapper();
    Map<String, Object> processesedEvent = mapper.convertValue(object, new TypeReference<Map<String, Object>>() {});
    processesedEvent.values().removeIf(Objects::isNull);
    return processesedEvent;
  }
}
