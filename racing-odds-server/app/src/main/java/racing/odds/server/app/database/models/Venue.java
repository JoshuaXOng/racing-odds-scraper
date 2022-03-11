package racing.odds.server.app.database.models;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Venue {
  @DBRef
  private String id;
  private String name;

  public String getId() {
    return this.id;
  }
  public String getName() {
    return name;
  }
}
