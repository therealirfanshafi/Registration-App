/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
    const grp = $app.dao().findRecordById('Group', e.record.get('Group'))
    for (let member of grp.get('Members')) {
        if ($app.dao().findRecordsByFilter('Group_Segment_Group', `Segment = "${e.record.get('Segment')}" && Group.Members.id ?= "${member}"`, '', 0, 0).length != 0) {
            throw new Error('failed')
        }
    }


}, 'Group_Segment_Group')

onRecordBeforeUpdateRequest((e) => {
    const segmentsOfGrp = $app.dao().findRecordsByFilter('Group_Segment_Group', `Group = "${e.record.id}"`, '', 0, 0).map((val) => val.get('Segment'))
    const segmentsOfMember = $app.dao().findRecordsByFilter('Group_Segment_Group', `Group.Members.id ?= "${e.record.get('Members')[0]}"`, '', 0, 0).map((val) => val.get('Segment'))
    for (seg1 of segmentsOfGrp) {
        for (seg2 of segmentsOfMember) {
            if (seg1 == seg2) {
                throw new Error('failed')
            }
        }
    }

}, 'Group')


onRecordBeforeCreateRequest((e) => {
    $app.dao().expandRecord(e.record, ['Group', 'Participant'])
    const grp = e.record.expandedOne('Group')
    $app.dao().expandRecord(grp, ['Admin'])
    if (grp.expandedOne('Admin').get('Category') !== e.record.expandedOne('Participant').get('Category')) {
        throw new Error('Failed Validation')
    }

}, 'Group_Request')