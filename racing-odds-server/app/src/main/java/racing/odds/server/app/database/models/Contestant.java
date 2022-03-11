package racing.odds.server.app.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Contestant {
  @Id
  private String id;
  private String name;

  public String getId() {
    return this.id;
  }
  public String getName() {
    return name;
  }
}