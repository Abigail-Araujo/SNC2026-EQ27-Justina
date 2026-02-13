CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password_hash TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP
);
CREATE TABLE scenarios (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    difficulty INT NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
    expected_time_seconds INT,
    version TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE scenario_parameters (
    id UUID PRIMARY KEY,
    scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    value_json JSONB NOT NULL,
    data_type TEXT NOT NULL
);
CREATE TABLE procedures (
    id UUID PRIMARY KEY,
    scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    version TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE procedure_steps (
    id UUID PRIMARY KEY,
    procedure_id UUID NOT NULL REFERENCES procedures(id) ON DELETE CASCADE,
    step_order INT NOT NULL,
    name TEXT NOT NULL,
    allowed_actions JSONB,
    constraints JSONB
);
CREATE TABLE runs (
    id UUID PRIMARY KEY,
    scenario_id UUID NOT NULL REFERENCES scenarios(id),
    user_id UUID NOT NULL REFERENCES users(id),
    status TEXT NOT NULL,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    seed TEXT,
    config JSONB
);
CREATE TABLE run_events (
    id UUID PRIMARY KEY,
    run_id UUID NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
    event_time TIMESTAMP NOT NULL,
    event_type TEXT NOT NULL,
    severity TEXT,
    payload JSONB
);
CREATE TABLE run_metric_summary (
    run_id UUID PRIMARY KEY REFERENCES runs(id) ON DELETE CASCADE,
    total_time_seconds INT,
    active_time_seconds INT,
    idle_time_seconds INT,
    actions_count INT,
    errors_total INT,
    critical_errors INT,
    path_efficiency_score FLOAT,
    smoothness_score FLOAT,
    precision_score FLOAT,
	ai_analysis_json JSONB,
	ai_generated_at TIMESTAMP,
    computed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed data
INSERT INTO users (id, email, full_name, password_hash, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@justina.io', 'Admin Justina', '$2b$12$KIXu8ltA5aqUzSx2cM7s4OMqA5Fnl2xe50Tzw9uQWGWpZJYG1ChB2', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'trainee@justina.io', 'Resident One', '$2b$12$KIXu8ltA5aqUzSx2cM7s4OMqA5Fnl2xe50Tzw9uQWGWpZJYG1ChB2', 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO scenarios (id, name, description, difficulty, expected_time_seconds, version, is_active)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'KidneyUturing', 'Renal suturing intervention focused on precise closure and vessel safety.', 3, 2400, 'v1.0.0', TRUE),
  ('44444444-4444-4444-4444-444444444444', 'Liver Resection', 'Liver tissue dissection with vascular control and bleeding management.', 4, 3000, 'v1.0.0', TRUE),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Prostatectomy', 'Pelvic dissection around prostate with nerve-sparing goals.', 4, 3300, 'v1.0.0', TRUE),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Gastric Bypass', 'Upper GI reconstruction with pouch creation and anastomosis.', 5, 3900, 'v1.0.0', TRUE),
  ('12121212-1212-1212-1212-121212121212', 'Colon Anastomosis', 'Colon resection and stapled or hand-sewn anastomosis integrity test.', 3, 2700, 'v1.0.0', TRUE),
  ('34343434-3434-3434-3434-343434343434', 'Esophagectomy', 'Thoracoabdominal mobilization and reconstruction of the esophagus.', 5, 4200, 'v1.0.0', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO scenario_parameters (id, scenario_id, key, value_json, data_type)
VALUES
  ('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'suture_tension_newton', '{"min": 0.8, "max": 2.2}', 'range'),
  ('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'bleeding_rate_ml_min', '{"mean": 35, "std": 10}', 'distribution'),
  ('abababab-abab-abab-abab-abababababab', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'nerve_proximity_mm', '{"min": 1.0, "max": 5.0}', 'range'),
  ('cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'pouch_volume_ml', '{"target": 30}', 'fixed'),
  ('efefefef-efef-efef-efef-efefefefefef', '12121212-1212-1212-1212-121212121212', 'anastomosis_leak_risk', '{"low": 0.02, "high": 0.12}', 'range'),
  ('56565656-5656-5656-5656-565656565656', '34343434-3434-3434-3434-343434343434', 'thoracic_visibility', '{"levels": ["low", "medium", "high"]}', 'enum')
ON CONFLICT (id) DO NOTHING;

INSERT INTO procedures (id, scenario_id, name, description, version)
VALUES
  ('77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'KidneyUturing Core Procedure', 'Step-by-step suturing and closure workflow for renal intervention.', 'v1.0.0'),
  ('88888888-8888-8888-8888-888888888888', '44444444-4444-4444-4444-444444444444', 'Liver Resection Core Procedure', 'Parenchymal transection with vascular and hemostatic control.', 'v1.0.0'),
  ('90909090-9090-9090-9090-909090909090', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Prostatectomy Core Procedure', 'Controlled dissection and removal while preserving key structures.', 'v1.0.0'),
  ('91919191-9191-9191-9191-919191919191', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Gastric Bypass Core Procedure', 'Pouch creation and intestinal reconstruction sequence.', 'v1.0.0'),
  ('92929292-9292-9292-9292-929292929292', '12121212-1212-1212-1212-121212121212', 'Colon Anastomosis Core Procedure', 'Resection with safe anastomotic reconnection and leak checks.', 'v1.0.0'),
  ('93939393-9393-9393-9393-939393939393', '34343434-3434-3434-3434-343434343434', 'Esophagectomy Core Procedure', 'Mobilization, resection, and conduit reconstruction workflow.', 'v1.0.0')
ON CONFLICT (id) DO NOTHING;

INSERT INTO procedure_steps (id, procedure_id, step_order, name, allowed_actions, constraints)
VALUES
  ('99999999-9999-9999-9999-999999999999', '77777777-7777-7777-7777-777777777777', 1, 'Expose renal cortex', '["camera_move", "dissect"]', '{"max_force": 30}'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', 2, 'Complete cortical suturing', '["needle_drive", "knot_tie"]', '{"time_limit_sec": 420}'),
  ('b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', '88888888-8888-8888-8888-888888888888', 1, 'Mobilize liver segments', '["camera_move", "dissect"]', '{"max_force": 28}'),
  ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '88888888-8888-8888-8888-888888888888', 2, 'Transect liver parenchyma', '["coagulate", "cut"]', '{"blood_loss_limit_ml": 500}'),
  ('d2d2d2d2-d2d2-d2d2-d2d2-d2d2d2d2d2d2', '90909090-9090-9090-9090-909090909090', 1, 'Develop pelvic plane', '["dissect", "retract"]', '{"nerve_distance_min_mm": 2}'),
  ('e3e3e3e3-e3e3-e3e3-e3e3-e3e3e3e3e3e3', '90909090-9090-9090-9090-909090909090', 2, 'Control dorsal venous complex', '["clip", "coagulate"]', '{"time_limit_sec": 300}'),
  ('f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4', '91919191-9191-9191-9191-919191919191', 1, 'Create gastric pouch', '["staple", "cut"]', '{"target_volume_ml": 30}'),
  ('15151515-1515-1515-1515-151515151515', '91919191-9191-9191-9191-919191919191', 2, 'Perform gastrojejunal anastomosis', '["suture", "knot_tie"]', '{"leak_test_required": true}'),
  ('16161616-1616-1616-1616-161616161616', '92929292-9292-9292-9292-929292929292', 1, 'Resect affected colon segment', '["clip", "cut"]', '{"margin_mm": 20}'),
  ('17171717-1717-1717-1717-171717171717', '92929292-9292-9292-9292-929292929292', 2, 'Construct colon anastomosis', '["staple", "suture"]', '{"leak_test_required": true}'),
  ('18181818-1818-1818-1818-181818181818', '93939393-9393-9393-9393-939393939393', 1, 'Mobilize esophagus', '["dissect", "retract"]', '{"pleural_breach_allowed": false}'),
  ('19191919-1919-1919-1919-191919191919', '93939393-9393-9393-9393-939393939393', 2, 'Build gastric conduit and anastomose', '["staple", "suture", "knot_tie"]', '{"max_anastomosis_time_sec": 900}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO runs (id, scenario_id, user_id, status, started_at, ended_at, seed, config)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'COMPLETED', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '90 minutes', 'seed-001', '{"graphics":"high","assist_mode":true}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO run_events (id, run_id, event_time, event_type, severity, payload)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NOW() - INTERVAL '110 minutes', 'tool_collision', 'warning', '{"tool":"grasper","force":22.7}'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NOW() - INTERVAL '100 minutes', 'bleeding_controlled', 'info', '{"time_to_control_sec":42}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO run_metric_summary (
  run_id,
  total_time_seconds,
  active_time_seconds,
  idle_time_seconds,
  actions_count,
  errors_total,
  critical_errors,
  path_efficiency_score,
  smoothness_score,
  precision_score,
  ai_analysis_json,
  ai_generated_at
)
VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  1800,
  1450,
  350,
  226,
  3,
  0,
  0.87,
  0.81,
  0.9,
  '{"summary":"Strong vascular control and consistent precision."}',
  NOW() - INTERVAL '85 minutes'
)
ON CONFLICT (run_id) DO NOTHING;
