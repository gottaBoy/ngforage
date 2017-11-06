import {InstanceFactory} from "./InstanceFactory.service";
import {TestBed} from "@angular/core/testing";
import {module} from "../NgForage.module";
import 'localforage';
import {NgForageOptions} from "../config/NgForageOptions";
import * as _ from 'lodash';
import {NgForageConfig} from "../config/NgForageConfig.service";

describe("Instance factory", () => {
  let i1: LocalForage;
  let i2: LocalForage;
  let i3: LocalForage;

  beforeEach(() => {
    TestBed.configureTestingModule(module);
    const fact: InstanceFactory = TestBed.get(InstanceFactory);

    const getConf = (overrides: Partial<NgForageOptions> = {}): NgForageOptions => {
      const inst: NgForageConfig = TestBed.get(NgForageConfig);
      const defaults = _.cloneDeep(inst.config);

      inst.configure(overrides);
      const conf = inst.config;
      inst.configure(defaults);

      return conf;
    };

    i1 = fact.getInstance(getConf({version: 2}));
    i2 = fact.getInstance(getConf({version: 2}));
    i3 = fact.getInstance(getConf({driver: ''}));
  });

  it("1 === 2", () => {
    expect(i1).toBe(i2);
  });

  it("1 !== 3", () => {
    expect(i1).not.toBe(i3);
  });

  it("2 !== 3", () => {
    expect(i2).not.toBe(i3);
  });
});