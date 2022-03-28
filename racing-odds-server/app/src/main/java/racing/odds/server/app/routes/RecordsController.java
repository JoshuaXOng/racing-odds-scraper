package racing.odds.server.app.routes;

import java.util.List;
import java.util.Map;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import racing.odds.server.app.database.models.OddsRecord;
import racing.odds.server.app.database.models.OddsSnapshot;
import racing.odds.server.app.database.repositories.OddsRecordRepository;
import racing.odds.server.utilities.MapUtils;

@RestController
@RequestMapping(value = "/api/v0/records")
public class RecordsController {
  private MongoOperations mongoOps;
  private OddsRecordRepository recordsRepository;

  public RecordsController(MongoOperations mongoOps, OddsRecordRepository recordsRepository) {
    this.mongoOps = mongoOps;
    this.recordsRepository = recordsRepository;
  }

  @RequestMapping(method = RequestMethod.GET, value = "/{id}")
  public OddsRecord getRecord(@PathVariable String id) {
    return this.recordsRepository.findOneById(id);
  }

  @RequestMapping(method = RequestMethod.GET)
  public List<OddsRecord> getRecords() {
    return this.recordsRepository.findAll();
  }

  @RequestMapping(method = RequestMethod.POST)
  public OddsRecord createRecord(@RequestBody OddsRecord record) {
    return mongoOps.insert(record);
  }

  @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
  public OddsRecord updateRecord(@PathVariable String id, @RequestBody OddsRecord record) {
    Map<String, Object> processesedRecord = MapUtils.fromObjectWoNulls(record);

    Query predicate = Query.query(Criteria.where("_id").is(id));
    Update updateCommands = new Update();
    processesedRecord.forEach(updateCommands::set);
    FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

    return mongoOps.findAndModify(predicate, updateCommands, options, OddsRecord.class);
  }

  @RequestMapping(method = RequestMethod.PUT, value = "/{id}/snapshots")
  @Transactional
  public OddsRecord updateRecordShapshots(
      @PathVariable String id, @RequestBody OddsSnapshot snapshot) {
    mongoOps.insert(snapshot);
    Query findPredicate = Query.query(Criteria.where("_id").is(id));
    mongoOps.find(findPredicate, OddsRecord.class);
    return mongoOps.findOne(findPredicate, OddsRecord.class);
  }

  @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
  public List<OddsRecord> deleteRecord(@PathVariable String id) {
    return mongoOps.findAllAndRemove(Query.query(Criteria.where("id").is(id)), OddsRecord.class);
  }
}
