/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

onRecordCreateRequest((e) => {
    const grp = $app.findRecordById('Group', e.record.get('Group'))
    for (let member of grp.get('Members')) {
        if ($app.findRecordsByFilter('Group_Segment_Group', `Segment = "${e.record.get('Segment')}" && Group.Members.id ?= "${member}"`, '', 0, 0).length != 0) {
            throw new Error('failed')
        }
    }

    e.next()

}, 'Group_Segment_Group')

onRecordUpdateRequest((e) => {
    const segmentsOfGrp = $app.findRecordsByFilter('Group_Segment_Group', `Group = "${e.record.id}"`, '', 0, 0).map((val) => val.get('Segment'))
    const currentMembers = $app.findRecordById('Group', e.record.id).get('Members')
    const newMember = e.record.get('Members').find((val) => !currentMembers.includes(val))
    const segmentsOfMember = $app.findRecordsByFilter('Group_Segment_Group', `Group.Members.id ?= "${newMember}"`, '', 0, 0).map((val) => val.get('Segment'))
    for (let seg1 of segmentsOfGrp) {
        for (let seg2 of segmentsOfMember) {
            if (seg1 == seg2) {
                throw new Error('failed')
            }
        }
    }
    if (e.record.get('Members').length == 4) {
        const grpRequests = $app.findRecordsByFilter('Group_Requests', `Group = "${e.record.id}"`, '', 0, 0)
    
        for (let req of grpRequests) {
            $app.delete(req)

        }
    }
    e.next()

}, 'Group')


onRecordCreateRequest((e) => {
    $app.expandRecord(e.record, ['Group', 'Participant'])
    const grp = e.record.expandedOne('Group')
    $app.expandRecord(grp, ['Admin'])
    $app.expandRecord(grp.expandedOne('Admin'), ['Category'])
    $app.expandRecord(e.record.expandedOne('Participant'), ['Category'])
    if (grp.expandedOne('Admin').expandedOne('Category').get('Category') !== e.record.expandedOne('Participant').expandedOne('Category').get('Category')) {
        throw new Error('Failed Validation')
    }

    e.next()

}, 'Group_Requests')